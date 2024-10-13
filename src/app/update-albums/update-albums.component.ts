import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../model/album.model';

@Component({
  selector: 'app-update-albums',
  templateUrl: './update-albums.component.html',
  styles: ``
})
export class UpdateAlbumsComponent {
  @Input()
  album! : Album;
  @Input()
  ajout!:boolean;
  ngOnInit(): void {
    console.log("ngOnInit du composant Updatealbum ",this.album);
    }
    @Output()
albumUpdated = new EventEmitter<Album>();

saveAlbum(){
  this.albumUpdated.emit(this.album);
  }
}
