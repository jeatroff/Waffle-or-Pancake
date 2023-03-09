class AddIsSolvedToTurn < ActiveRecord::Migration[7.0]
  def change
    add_column :turns, :is_solved, :boolean
  end
end
