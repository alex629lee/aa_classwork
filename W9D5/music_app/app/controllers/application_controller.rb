class ApplicationController < ActionController::Base
    helper_method :current_user

    def current_user 
        return nil if session[:session_token].nil? 
        
        # fail
        @current_user ||= User.find_by(session_token: session[:session_token])
    end 

    def logged_in? 
        !!current_user
    end 

    def login_user!(user)
        token = user.reset_session_token! 
        session[:session_token] = token
    end 
end
