
import { useNavigate } from 'react-router-dom';
import './SelectionPage.css';

function SelectionPage() {
  const navigate = useNavigate();

  const handleSelection = (choice) => {
    if (choice === 'file') {
      navigate('/file-fir');
    } else if (choice === 'view') {
      navigate('/view-fir');
    }
  };

  return (
    <div className="selection-container">
      <h1 className="selection-heading">🚨 Welcome to ChainFIR</h1>
      <div className="button-group">
        <button className="selection-button" onClick={() => handleSelection('file')}>
          📄 File FIR
        </button>
        <button className="selection-button" onClick={() => handleSelection('view')}>
          📂 View FIR
        </button>
      </div>
    </div>
  );
}

export default SelectionPage;
