class UserGameSerializer < ActiveModel::Serializer
  attributes :user_id, :game_id, :updated_at
end
