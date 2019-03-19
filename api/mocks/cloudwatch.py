class MockCloudWatch(object):
    def __init__(self):
      self._metric_values = {}

    def put_metric_data(self, **kwargs):
        # TODO: extend to more than one dimension when this becomes necessary
        for metric_datum in kwargs['MetricData']:
            metric_name = metric_datum['MetricName']
            dimension = metric_datum['Dimensions'][0]['Value']

            if metric_name not in self._metric_values:
                self._metric_values[metric_name] = {}
            if dimension not in self._metric_values[metric_name]:
                self._metric_values[metric_name][dimension] = 0

            self._metric_values[metric_name][dimension] += metric_datum['Value']

    # TODO: if we ever need read functionality then we should consider adding the
    # equivalent mock here instead of doing this shortcut.
    @property
    def metric_values(self):
        return self._metric_values