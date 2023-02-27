class TurnSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :old_guess, :new_guess, :is_solved
end
