class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :num_games, :num_wins

  has_many :games
end
