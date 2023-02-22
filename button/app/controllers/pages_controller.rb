class PagesController < ApplicationController
  def home
    @post = Post.first if Post.any?
  end

  def upvote
    @post = Post.find(params[:id])
    # Increment the upvotes column by 1
    @post.increment!(:upvote)
    # Redirect to the root path
    redirect_to root_path
  end

  def downvote
    @post = Post.find(params[:id])
    # Decrement the upvotes column by 1
    @post.decrement!(:upvote)
    # Redirect to the root path
    redirect_to root_path
  end
end