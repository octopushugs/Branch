class AddZipToOrgs < ActiveRecord::Migration
  def change
	  change_table :orgs do |t|
		  t.integer :zipcode
	  end
  end
end
