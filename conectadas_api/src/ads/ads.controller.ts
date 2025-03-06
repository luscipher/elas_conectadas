import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dtos/CreateAd.dto';
import { UpdateAdDto } from './dtos/UpdateAd.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post('create')
  //@UsePipes(ValidationPipe)
  createAd(@Body() createAdDto: CreateAdDto) {
    return this.adsService.createAd(createAdDto);
  }

  @Get('list')
  getAllAds() {
    return this.adsService.getAds();
  }

  @Get(':id')
  getAdById(@Param('id') id: string) {
    return this.adsService.getAdById(Number(id));
  }

  @Patch(':id')
  patchAd(@Param('id', ParseIntPipe) id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adsService.patchAd(Number(id), updateAdDto);
  }

  @Delete(':id')
  deleteAdById(@Param('id', ParseIntPipe) id: string) {
    return this.adsService.deleteAd(Number(id));
  }
}