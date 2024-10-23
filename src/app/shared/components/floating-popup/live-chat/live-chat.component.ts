import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroFaceSmileSolid,heroPaperClipSolid} from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-live-chat',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './live-chat.component.html',
  styleUrl: './live-chat.component.scss',
  providers:[  provideIcons({
    heroFaceSmileSolid,
    heroPaperClipSolid
  }),]
})
export class LiveChatComponent {

}
