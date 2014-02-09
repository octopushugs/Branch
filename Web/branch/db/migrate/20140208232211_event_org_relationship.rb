class EventOrgRelationship < ActiveRecord::Migration
  def change
	  remove_column :events, :owner

	  change_table :events do |t|
		  t.integer :org_id
	  end
  end
end
