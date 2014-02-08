class AddNameToStudent < ActiveRecord::Migration
  def change
	  change_table :students do |t|
		  t.string :full_name
	  end
  end
end
