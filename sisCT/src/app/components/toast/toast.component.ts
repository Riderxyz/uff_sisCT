import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage, ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
    standalone: false,
    animations: [
        trigger('toastAnimation', [
            state('void', style({
                transform: 'translateX(100%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('void => visible', animate('300ms ease-out')),
            transition('visible => void', animate('200ms ease-in'))
        ])
    ]
})
export class ToastComponent implements OnInit, OnDestroy {
    @Input() position: string = 'top-right';
    @Input() autoClose: boolean = true;

    messages: ToastMessage[] = [];
    private subscription: Subscription | undefined;
    private autoCloseTimers: any[] = [];

    constructor(private toastService: ToastService) { }

    ngOnInit(): void {
        this.subscription = this.toastService.toast$.subscribe(message => {
            this.addToast(message);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.clearAllTimers();
    }

    addToast(message: ToastMessage): void {
        this.messages.push(message);

        if (this.autoClose && !message.sticky && message.life !== undefined) {
            const timer = setTimeout(() => {
                this.removeToast(this.messages.indexOf(message));
            }, message.life);
            this.autoCloseTimers.push(timer);
        }
    }

    removeToast(index: number): void {
        if (index >= 0 && index < this.messages.length) {
            this.messages.splice(index, 1);
            if (this.autoCloseTimers[index]) {
                clearTimeout(this.autoCloseTimers[index]);
                this.autoCloseTimers.splice(index, 1);
            }
        }
    }

    clearAllTimers(): void {
        this.autoCloseTimers.forEach(timer => clearTimeout(timer));
        this.autoCloseTimers = [];
    }
}
