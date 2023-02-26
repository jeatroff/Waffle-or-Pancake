class User < ApplicationRecord
    has_secure_password
    validates :username, uniqueness: true

    has_many :user_games
    has_many :games, through: :user_games
    has_many :turns
end
