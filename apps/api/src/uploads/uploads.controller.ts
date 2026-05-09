import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile, 
  UseGuards 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming this exists from Phase 6
import { RolesGuard } from '../auth/guards/roles.guard'; // Assuming this exists from Phase 6
import { Roles } from '../auth/decorators/roles.decorator'; // Assuming this exists from Phase 6

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('image')
  // Uncomment guards when auth is fully setup
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadImage(file);
  }
}
