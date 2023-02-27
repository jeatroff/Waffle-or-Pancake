class TurnsController < ApplicationController
    def create
        turn = Turn.create!(turn_params)
        render json: turn, status: :created
    end

    def update
        turn = Turn.find(params[:id])
        turn.update(turn_params)
        render json: turn, status: :ok
    end

    def destroy
        turn = Turn.find(params[:id])
        turn.destroy
        render json: {}, status: :ok
    end

    private

    def turn_params
        params.permit(:user_id, :game_id, :old_guess, :new_guess, :is_solved)
    end
end
