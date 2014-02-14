class RemoveOrgsIdFromEvents < ActiveRecord::Migration
  def change
  	remove_column :events, :orgs_id
  end
end
