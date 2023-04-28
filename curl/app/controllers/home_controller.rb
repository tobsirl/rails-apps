class HomeController < ApplicationController
  protect_from_forgery with: :null_session

  # curl -X GET http://127.0.0.1:3000/index\?foo\=Paul 
  # get example with query string
  def index
    # render plain: "Hello, Rails!"
    render plain: "Hello, Rails! #{request.params[:foo]}"
  end

  # curl -X POST -d "name=Paul" http://127.0.0.1:3000/post_example
  # post example with body
  def post_example
    render plain: "You've hit the create action! #{request.body.read}"
  end
end
