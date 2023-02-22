class PagesController < ApplicationController
  def home
    @post = Post.first if Post.any?
  end

  def upvote
    puts "ID: #{params[:id]}"
  end
end
