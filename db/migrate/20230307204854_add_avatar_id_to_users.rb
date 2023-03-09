class AddAvatarIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :avatar_id, :integer
  end
end
