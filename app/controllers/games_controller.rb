class GamesController < ApplicationController
    def index
        render json: Game.all, status: :ok
    end

    def create
        game = Game.create!(game_params)
        render json: game, status: :created
    end

    def show
        game = Game.find(params[:id])
        render json: game, status: :ok
    end

    def destroy
        game = Game.find(params[:id])
        game.destroy
        render json: {}, status: :ok
    end

    private

    def game_params
        params.permit(:solution, :leader_name, :player_1, :player_2, :player_3, :player_4)
    end
end
