import { Rupee } from '../utils';
import PropTypes from 'prop-types';

export function SimpleInvoiceDisplay({ invoice }) {
  return <div className={'flex flex-col p-4 border-2 m-4'}>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>No</span>
      <span className={'ml-8 font-bold'}>
        {invoice.invoiceNo}
      </span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span>Date</span>
      <span className={'ml-8 font-bold'}>
        {invoice.invoiceDate}
      </span>
    </div>
    <div className='flex justify-between mb-2 border-b-2 pb-2'>
      <span> Amount</span>
      <span className={'ml-8 font-bold'}><Rupee>
        {invoice.invoiceValue}
      </Rupee></span>
    </div>
  </div>;
}

SimpleInvoiceDisplay.propTypes = {
  invoice: PropTypes.any,
};