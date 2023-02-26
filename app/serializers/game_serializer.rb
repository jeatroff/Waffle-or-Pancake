class GameSerializer < ActiveModel::Serializer
  attributes :id, :solution, :leader_name, :player_1, :player_2, :player_3, :player_4, :updated_at

  has_many :users
  has_many :turns
end
