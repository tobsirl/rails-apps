class PinterestController < ApplicationController
  def index
    client_id = ENV['PINTEREST_CLIENT_ID']
    redirect_uri = "http://localhost:3000/oauth/pinterest/oauth_response/"
    puts "client_id: #{client_id}"
    puts "redirect_uri: #{redirect_uri}"
    auth_url = "https://www.pinterest.com/oauth/?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code&scope=boards:read,pins:read&state=123"
    redirect_to auth_url, allow_other_host: true
  end

  def oauth_response
    puts "************************************************************************************************"
    puts "oauth_response"
    puts "params: #{params}"
    @code = params[:code]
    puts "code: #{@code}"
    # get state param
    @state = params[:state]
    client_id = ENV['PINTEREST_CLIENT_ID']
    client_secret = ENV['PINTEREST_CLIENT_SECRET']
  end
end
