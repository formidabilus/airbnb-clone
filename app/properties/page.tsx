import EmptyState from "../components/EmptyState";
import ClientsOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientsOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientsOnly>
    );
  }
  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientsOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientsOnly>
    );
  }

  return (
    <ClientsOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientsOnly>
  );
};

export default PropertiesPage;
