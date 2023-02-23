class ApplicationController < ActionController::API
    include ActionController::Cookies
    
    before_action :authorize

    # def hello_world
    #     session[:count] = (session[:count] || 0) + 1
    #     render json: { count: session[:count] }
    # end

    private

    def authorize
        @current_user = User.find_by(id: session[:user_id])
        # The line below breaks my code for some reason, apparently the unless syntax is wrong.
        # render json: {error: "Not authorized, please log in."}, unless @current_user
    end
end
