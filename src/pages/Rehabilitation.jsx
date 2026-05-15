import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const emptyForm = {
  name: '',
  age: '',
  height: '',
  weight: '',
  gender: 'male',
  description: '',
  hibernationTime: '',
};

function Rehabilitation() {
  const [bears, setBears] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingBear, setEditingBear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState('');

  const loadBears = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setBears(response.data);
    } catch (error) {
      setToast('Не вдалося завантажити список бурих ведмедів');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBears();
  }, []);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  const openCreateForm = () => {
    setEditingBear(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (bear) => {
    setEditingBear(bear);
    setFormData({
      name: bear.name,
      age: bear.age,
      height: bear.height,
      weight: bear.weight,
      gender: bear.gender,
      description: bear.description || '',
      hibernationTime: bear.hibernationTime,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBear(null);
    setFormData(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const prepareBearData = () => ({
    name: formData.name,
    age: Number(formData.age),
    height: Number(formData.height),
    weight: Number(formData.weight),
    gender: formData.gender,
    description: formData.description,
    hibernationTime: Number(formData.hibernationTime),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const bearData = prepareBearData();

      if (editingBear) {
        await axios.put(`${API_URL}/${editingBear._id}`, bearData);
        showToast('Дані про бурого ведмедя успішно оновлено');
      } else {
        await axios.post(API_URL, bearData);
        showToast('Бурого ведмедя успішно додано');
      }

      closeForm();
      await loadBears();
    } catch (error) {
      showToast('Помилка під час збереження даних');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Видалити цей запис про бурого ведмедя?');

    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      showToast('Запис про бурого ведмедя видалено');
      await loadBears();
    } catch (error) {
      showToast('Помилка під час видалення запису');
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString('uk-UA');
  };

  return (
    <main className="container py-4">
      <section>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h2 text-success mb-1">Реабілітація бурих ведмедів</h2>
            <p className="mb-0">
              Динамічна таблиця записів із MongoDB через Express API.
            </p>
          </div>

          <button className="btn btn-success" onClick={openCreateForm}>
            Додати ведмедя
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Завантаження...</span>
            </div>
            <p className="mt-3">Завантаження даних...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Ім&apos;я</th>
                  <th>Вік (роки)</th>
                  <th>Зріст (см)</th>
                  <th>Вага (кг)</th>
                  <th>Стать</th>
                  <th>Час сплячки (дні)</th>
                  <th>Опис</th>
                  <th>Дата додавання</th>
                  <th>Дії</th>
                </tr>
              </thead>

              <tbody>
                {bears.length > 0 ? (
                  bears.map((bear) => (
                    <tr key={bear._id}>
                      <td>{bear.name}</td>
                      <td>{bear.age}</td>
                      <td>{bear.height}</td>
                      <td>{bear.weight}</td>
                      <td>{bear.gender === 'male' ? 'Самець' : 'Самиця'}</td>
                      <td>{bear.hibernationTime}</td>
                      <td>{bear.description || '-'}</td>
                      <td>{formatDate(bear.dateAdded)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => openEditForm(bear)}
                          >
                            Редагувати
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(bear._id)}
                          >
                            Видалити
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Записів поки немає
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showForm && (
        <div className="modal d-block rehabilitation-modal" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h3 className="modal-title h5">
                    {editingBear ? 'Редагування запису' : 'Додавання бурого ведмедя'}
                  </h3>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeForm}
                    aria-label="Закрити"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Ім&apos;я</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Стать</label>
                      <select
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="male">Самець</option>
                        <option value="female">Самиця</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Вік</label>
                      <input
                        type="number"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Зріст (см)</label>
                      <input
                        type="number"
                        name="height"
                        className="form-control"
                        value={formData.height}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Вага (кг)</label>
                      <input
                        type="number"
                        name="weight"
                        className="form-control"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Час сплячки (дні)</label>
                      <input
                        type="number"
                        name="hibernationTime"
                        className="form-control"
                        value={formData.hibernationTime}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Опис</label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeForm}>
                    Скасувати
                  </button>

                  <button type="submit" className="btn btn-success">
                    {editingBear ? 'Зберегти зміни' : 'Додати'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showForm && <div className="modal-backdrop fade show"></div>}

      {toast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show" role="alert">
            <div className="toast-header">
              <strong className="me-auto">Повідомлення</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setToast('')}
                aria-label="Закрити"
              ></button>
            </div>

            <div className="toast-body">{toast}</div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Rehabilitation;