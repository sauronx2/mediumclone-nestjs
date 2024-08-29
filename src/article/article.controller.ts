import { AuthGuard } from '@app/user/guards/auth.guard';
import { ArticleService } from './article.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserEntity } from '@app/user/user.entity';
import { ArticleDto as ArticleDto } from './dto/article.dto';
import { User } from '@app/user/decorators/user.decorator';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') articleDto: ArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(currentUser, articleDto);
    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getSingleArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@User('id') currentUserId: number, @Param('slug') slug: string) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
    @Body('article') updateArticleDto: ArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(slug, currentUserId, updateArticleDto);
    return this.articleService.buildArticleResponse(article);
  }
}
