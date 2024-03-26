import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';

export default function Pocetna() {
  const [podaci, setPodaci] = useState([]);


  async function getPodaci() {


    const res = await grupaService
      .get()
      .then((res) => {
        return res.data.map((grupa) => {
          return {
            y: grupa.brojpolaznika,
            name: grupa.naziv,
          };
        });
      })
      .catch((err) => prikaziError(err.poruka));

    setPodaci(res);

  }

  useEffect(() => {
    getPodaci();
  }, []);

  return (
    <Container className='mt-4'>
      {podaci.length > 0 && (
        <PieChart
          highcharts={Highcharts}
          options={{
            ...fixedOptions,
            series: [
              {
                name: 'Polaznici',
                colorByPoint: true,
                data: podaci,
              },
            ],
          }}
        />
      )}
    </Container>
  );
}

const fixedOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Broj polaznika po grupi',
    align: 'left',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    enabled: false,
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
};