class AvatarsController < ApplicationController
    def index
        render json: Avatar.all, status: :ok
    end

    def create
        avatar = Avatar.create!(avatar_params)
        render json: avatar, status: :created
    end

    def show
        avatar = Avatar.find(params[:id])
        render json: avatar, status: :ok
    end

    # def update
    #     avatar = Avatar.find(params[:id])
    #     avatar.update(avatar_params)
    #     render json: avatar, status: :ok
    # end

    def destroy
        avatar = Avatar.find(params[:id])
        avatar.destroy
        render json: {}, status: :ok
    end

    private

    def avatar_params
        params.permit(:id, :image)
    end
end
