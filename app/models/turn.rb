class Turn < ApplicationRecord
    belongs_to :user
    belongs_to :game

    attribute :is_solved, :boolean, default: false
end
