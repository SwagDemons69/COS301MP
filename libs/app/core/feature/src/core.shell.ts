import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { SubscribeToAuthState } from '@mp/app/auth/util';
import { Store } from '@ngxs/store';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'ms-core-shell',
  templateUrl: 'core.shell.html',
  styleUrls: ['core.shell.scss'],
})
export class CoreShell implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  private updateAvailable$ = this.swUpdate.versionUpdates.pipe(
    tap((evt) => {
      if (evt.type === 'VERSION_READY') {
        this.updateToast();
      }
    }),
    takeUntil(this.ngUnsubscribe)
  );

  constructor(
    private readonly store: Store,
    private readonly swUpdate: SwUpdate,
    private readonly toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new SubscribeToAuthState());
    this.updateAvailable$.subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async updateToast() {
    const toast = await this.toastController.create({
      header: 'Update Available',
      message: 'Reload the app to receive the new update.',
      position: 'bottom',
      buttons: [
        {
          text: 'Reload',
          role: 'cancel',
          handler: () => {
            localStorage.clear();
            window.location.reload();
          },
        },
      ],
    });
    await toast.present();
  }
}
