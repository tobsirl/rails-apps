class AddUpvotesToPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :upvote, :integer
  end
end
