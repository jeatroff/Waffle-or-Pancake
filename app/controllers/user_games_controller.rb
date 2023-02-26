class UserGamesController < ApplicationController
    def index
        render json: UserGame.all, status: :ok
    end

    def create
        user_game = UserGame.create!(user_game_params)
        render json: user_game, status: :created
    end

    def show
        user_game = UserGame.find(params[:id])
        render json: user_game, status: :ok
    end

    def destroy
        user_game = UserGame.find(params[:id])
        user_game.destroy
        render json: {}, status: :ok
    end

    def update
        user_game = UserGame.find(params[:id])
        user.update(user_game_params)
        render json: user_game, status: :ok
    end

    private

    def user_game_params
        params.permit(:user_id, :game_id)
    end
end
