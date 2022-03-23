import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}
  
  @Get('/supported-crypto-currency')
  getSupportedCryptoCurrency() {
    return this.appService.getSupportedCryptoCurrency();
  }

  @Get('/price-information')
  getPriceInformation(@Query('baseRate') baseRate: string, @Query('quoteRate') quoteRate: string) {
    if (baseRate === undefined) {
      throw new BadRequestException('baseRate is not to be undefined'); 
    }
    return this.appService.getPriceInformation(baseRate, quoteRate);
  }
}
