import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FoldersService } from '../folders/folders.service';
import { Observable } from 'rxjs';

@Injectable()
export class FolderGuard implements CanActivate {
  constructor(private folderService: FoldersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { folderId, user } = request.params;
    return !!this.folderService.findById(user, folderId, false);
  }
}
