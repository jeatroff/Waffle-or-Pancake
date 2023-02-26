class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        render json: User.all, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user, status: :ok
    end

    def show
        render json: @current_user
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: {}, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :num_games)
    end

    def record_not_found
        render json: {error: ["User not found"]}, status: :not_found
    end

    def record_invalid
        render json: {error: ["Username has already been taken"]}, status: 422
    end
end
