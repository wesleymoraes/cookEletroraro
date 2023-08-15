export const getClusterDiscount = (clusters) => {
  if (!clusters) return 0;
  if (clusters.length === 0) return 0;

  const matchClusterDiscount = /a vista [0-9]*\% off/gi;
  const discountCluster = clusters.filter((cluster) => matchClusterDiscount.test(cluster.name));
  if (discountCluster.length > 0) {
    const [
      {
        name: clusterName,
      }
    ] = discountCluster;

    return parseInt(clusterName.match(/[0-9]+/g)[0]);
  }

  return 0;
}