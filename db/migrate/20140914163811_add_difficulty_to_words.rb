class AddDifficultyToWords < ActiveRecord::Migration
  def change
    add_column :words, :difficulty, :integer
  end
end
