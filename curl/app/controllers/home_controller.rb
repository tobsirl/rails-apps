class HomeController < ApplicationController
  def index
    # render plain: "Hello, Rails!"
    render plain: "Hello, Rails! #{request.params[:foo]}"
  end
end
