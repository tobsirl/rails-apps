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
    redirect_uri = "http://localhost:3000/oauth/pinterest/oauth_response/"
    code = params[:code]
    state = params[:state]
    client_id = ENV['PINTEREST_CLIENT_ID']
    client_secret = ENV['PINTEREST_CLIENT_SECRET']
    # base64 encode client_id:client_secret
    app_id_secret = Base64.strict_encode64("#{client_id}:#{client_secret}")
    puts "app_id_secret: #{app_id_secret}"
    authorization = "Basic #{app_id_secret}"
    


    # get access token
    # post request to https://api.pinterest.com/v5/oauth/token
    @response = HTTParty.post("https://api.pinterest.com/v5/oauth/token", 
      :headers => { 
        'Content-Type' => 'application/x-www-form-urlencoded',
        'Authorization' => authorization,
        'Accept' => 'application/json'
      },
      :body => {
        :grant_type => "authorization_code",
        :code => code,
        :redirect_uri => redirect_uri
      },
      :debug_output => $stdout
    )



  end
end
