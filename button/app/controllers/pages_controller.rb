class PagesController < ApplicationController
  def home
    @post = Post.first if Post.any?
  end
end
