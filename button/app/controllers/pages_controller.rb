class PagesController < ApplicationController
  def home
    @posts = Post.first
  end
end
