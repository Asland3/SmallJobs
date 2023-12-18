import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController, ScrollDetail, IonContent, IonCard } from '@ionic/angular';
import { Observable, Subscription, map } from 'rxjs';
import { Jobs } from 'src/app/models/jobs.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ChatService } from 'src/app/services/chat-service/chat.service';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.page.html',
  styleUrls: ['./active-chat.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveChatPage implements OnInit {
  // @ViewChild('scrollElement') scrollElement!: ElementRef;
  // messages: any[] = [];
  private messagesSubscription!: Subscription;
  showDetails = false;

  messages$!: Observable<any[]>;
  chatId!: string;
  recipient: any;
  currentUser: any;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.currentUser;

    const params = this.route.snapshot.queryParams;
    this.chatId = params['chatId'];


    // Check if userId parameter is available
    const recipientUserId = params['userId'];
    if (recipientUserId) {
      this.authService
        .getSpecificUser(recipientUserId)
        .then((recipientData) => {
          this.recipient = recipientData;
        });

      this.messages$ = this.chatService.getMessages(this.chatId).pipe(
        map((messages) =>
          messages.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt.seconds * 1000), // Convert to JavaScript Date
          }))
        )
      );
    }
  }

  // scrollToBottom() {
  //   const scrollElement = this.scrollElement.nativeElement;
  //   scrollElement.scrollTop = scrollElement.scrollHeight;
  // }

  // ionViewDidEnter() {
  //   this.scrollToBottom();
  // }

  // ngAfterViewInit() {
  //   this.scrollToBottom();
  // }

  sendMessage(text: any) {
    const userId = this.currentUser.uid;
    if (userId && text) {
      this.chatService.sendMessage(this.chatId, text, userId).then(() => {
        // Clear the input field, handle UI updates, etc.
        // this.scrollToBottom();
      });
    }
  }

  navigateToChat() {
    this.navCtrl.navigateBack('/chat');
  }

  openProfile() {
    this.navCtrl.navigateForward(`/view-profile/${this.recipient.uid}`);
  }
}
