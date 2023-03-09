class Game < ApplicationRecord
    has_many :user_games
    has_many :users, through: :user_games
    has_many :turns

    validates :leader_name, :player_1, presence: true
end
