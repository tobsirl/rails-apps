class PagesController < ApplicationController
  def home
    @post = Post.first if Post.any?
  end

  def upvote
    @post = Post.find(params[:id])
    
  end
end
