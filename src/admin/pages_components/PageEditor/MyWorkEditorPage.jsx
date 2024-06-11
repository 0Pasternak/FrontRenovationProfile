import React, { useState, useEffect } from "react";
import { getImg, getText, updateImg } from "./../../services/ControlPage";

import "./styles/homeEditorPage.css";

function HomeEditorPage() {
  const [data, setData] = useState({
    servicesHeaderImg: [],
    servicesImagenes: [],
    aboutusTitle: [],
    servicesText: [],
  });
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [textoEsp, setTextoEsp] = useState("");
  const [textoEng, setTextoEng] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          servicesHeaderImg,
          servicesImagenes,
          aboutusTitle,
          servicesText,
        ] = await Promise.all([
          getImg("header_works"),
          getImg("work"),
          getText("work_title"),
          getText("work_text"),
        ]);
        setData({
          servicesHeaderImg: servicesHeaderImg,
          servicesImagenes: servicesImagenes,
          aboutusTitle: aboutusTitle,
          servicesText: servicesText,
        });
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setTextoEsp(item.textoEsp);
    setTextoEng(item.textoEng);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleUpdate = async () => {
    if (selectedItem) {
      try {
        const data = {
          textoEsp,
          textoEng,
        };
        if (selectedItem.isImage) {
          await updateImg(selectedItem.id, data);
        } else {
          await updateImg(selectedItem.id, data);
        }
        closeModal();
        const [
          servicesHeaderImg,
          servicesImagenes,
          aboutusTitle,
          servicesText,
        ] = await Promise.all([
          getImg("header_works"),
          getImg("work"),
          getText("work_title"),
          getText("work_text"),
        ]);
        setData({
          servicesHeaderImg: servicesHeaderImg,
          servicesImagenes: servicesImagenes,
          aboutusTitle: aboutusTitle,
          servicesText: servicesText,
        });
      } catch (error) {
        console.error("Error updating translation:", error);
      }
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Section
        title="Header Images"
        items={data.servicesHeaderImg}
        onClick={openModal}
        isImage={true}
      />
      <Section
        title="Header Title"
        items={data.servicesImagenes}
        onClick={openModal}
        isImage={true}
      />
      <Section
        title="Header Title"
        items={data.aboutusTitle}
        onClick={openModal}
        isImage={false}
      />
      <Section
        title="optionals text"
        items={data.servicesText}
        onClick={openModal}
        isImage={false}
      />

      {isModalOpen && (
        <Modal
          textoEsp={textoEsp}
          textoEng={textoEng}
          setTextoEsp={setTextoEsp}
          setTextoEng={setTextoEng}
          handleUpdate={handleUpdate}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

const Section = React.memo(({ title, items, onClick, isImage }) => (
  <div>
    <h1>{title}</h1>
    {items && items.length > 0 ? (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className="content-list">
              {isImage ? (
                <img
                  src={item.textoEsp}
                  alt=""
                  onClick={() => onClick(item)}
                  className="image-item"
                />
              ) : (
                <p onClick={() => onClick(item)}>{item.textoEsp}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No items found</p>
    )}
  </div>
));

const Modal = ({
  textoEsp,
  textoEng,
  setTextoEsp,
  setTextoEng,
  handleUpdate,
  closeModal,
}) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <h2>Edit Texts</h2>
      <input
        type="text"
        value={textoEsp}
        onChange={(e) => setTextoEsp(e.target.value)}
        placeholder="Texto en Español"
      />
      <input
        type="text"
        value={textoEng}
        onChange={(e) => setTextoEng(e.target.value)}
        placeholder="Texto en Inglés"
      />
      <button onClick={handleUpdate}>Guardar Cambios</button>
    </div>
  </div>
);

export default HomeEditorPage;
