import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/core';
require('dotenv').config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

@Injectable()
export class AppService {
  private coinApiKey = process.env.COIN_API_KEY;
  private defaultQuoteRate = process.env.DEFAULT_RATE;
  constructor(private httpService: HttpService) {}

  async getSupportedCryptoCurrency() {
    const assets = await this.httpService
      .get('https://rest-sandbox.coinapi.io/v1/assets', {
        headers: {
          'X-CoinAPI-Key': this.coinApiKey,
        },
      })
      .toPromise();
    return (assets.data as []).map((elem: any) => elem.name);
  }

  async getPriceInformation(baseRate: string, quoteRate: string) {
    const price = await this.httpService
      .get(
        `https://rest-sandbox.coinapi.io/v1/exchangerate/${baseRate}/${
          quoteRate !== undefined ? quoteRate : this.defaultQuoteRate
        }`,
        {
          headers: {
            'X-CoinAPI-Key': this.coinApiKey,
          },
        },
      )
      .toPromise();
    const { src_side_quote, ...data } = price.data;
    return data;
  }
}
