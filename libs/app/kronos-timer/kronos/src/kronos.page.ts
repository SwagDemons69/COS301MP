import { Component } from "@angular/core";


@Component({
    selector: 'ms-kronos-page',
    templateUrl: './kronos.page.html',
    styleUrls: ['./kronos.page.css'],
  })


export class KronosTimer {

    //constructor

    static pickRandom(arr: any[]) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Convert a unix timestamp to a kronos string
    public static displayKronos(timeDelta: number) {
        if (timeDelta < 0) {
            return ([
                this.pickRandom(["ELIMINATED", "TERMINATED",]),
                this.pickRandom(["DISBANDED", "DISMISSED",]),
                this.pickRandom(["DECEASED", "DEPLETED", "PERISHED",]),
                this.pickRandom(["EXPIRED", "EXTINCT",]),
                this.pickRandom(["CEASED", "WASTED",]),
                this.pickRandom(["INERT", "ENDED"]),
                this.pickRandom(["DEAD", "LATE",]),
            ])[Math.floor(Math.abs(timeDelta)) % 7] + "💀";
        }

        const [years, days, hours, minutes, seconds] = [
            Math.floor(timeDelta / (60 * 60 * 24 * 365)),
            Math.floor((timeDelta % (60 * 60 * 24 * 365)) / 86400),
            Math.floor((timeDelta % (60 * 60 * 24)) / 3600),
            Math.floor((timeDelta % (60 * 60)) / 60),
            Math.floor(timeDelta % (60)),
        ];
        const [syears, sdays, shours, sminutes, sseconds] = [
            years.toString(),
            days.toString().padStart(1, '0'),
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0'),
        ]

        // HH:MM:SS
        if (years < 1 && days < 1) {
            return `${shours}:${sminutes}:${sseconds}`
        }
        // DD:HH:MM:SS
        else if (years < 1) {
            return `${sdays}:${shours}:${sminutes}:${sseconds}`
        }
        // YY:DD:HH:MM:SS
        else {
            return `${syears}:${sdays}:${shours}:${sminutes}:${sseconds}`
        }
    }

  public static formatActionNumber(num: number) {
    const ls = ["K", "M", "B", "T"];

    for (let i = ls.length; i >= 0; i--) {
      const x = 1000**(i+1);

      if(num >= x) {
        return Math.floor(10*num/x)/10 + ls[i];
      }
    }

    return num + "";
  }

}