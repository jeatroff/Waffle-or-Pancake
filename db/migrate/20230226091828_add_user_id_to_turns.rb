class AddUserIdToTurns < ActiveRecord::Migration[7.0]
  def change
    add_column :turns, :user_id, :integer
  end
end
