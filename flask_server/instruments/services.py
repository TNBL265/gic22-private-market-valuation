from database import db, InstrumentData
from utils import format_datetime


def create_an_instrument(data):
    expectedKeys = ["instrumentName", "instrumentType", "country","sector", "instrumentCurrency", "isTradeable", "notes"]
    for k in expectedKeys:
        if k not in data:
            return {
                "error": "missing fields"
            }
    data = InstrumentData(data["instrumentName"], data["instrumentType"], data["country"], data["sector"],
                          data["instrumentCurrency"], bool(data["isTradeable"]), data.get("notes", None))
    db.session.add(data)
    db.session.commit()
    out = {
        "instrumentId": data.instrumentId,
        "createdAt": data.createdAt.strftime("%Y-%m-%d %H:%M:%S")
    }
    db.session.remove()
    db.session.close()
    return out


def mass_create_instruments(data_obj):
    for d in data_obj:
        out = create_an_instrument(d)
    return out


def retrieve_an_instrument(instrumentId):
    instrument = InstrumentData.query.get(instrumentId)
    data = instrument.to_map_as_date_string() if instrument else "Not Available"
    return {"data": data}


def retrieve_list_of_instruments():
    instrument_list = InstrumentData.query.all()
    instrument_list = [instrument_data.to_map_as_date_string() for instrument_data in instrument_list]
    return {"data": instrument_list}


def update_an_instrument(instrumentId, data_obj):
    instrument = InstrumentData.query.filter_by(instrumentId=instrumentId).first()
    data = data_obj["data"]
    if not instrument:
        return "Instrument does not exist"
    try:
        instrument.instrumentName = data["instrumentName"]
        instrument.country = data["country"]
        instrument.sector = data["sector"]
        instrument.instrumentType = data["instrumentType"]
        instrument.instrumentCurrency = data["instrumentCurrency"]
        instrument.isTradeable = bool(data["isTradeable"])
        instrument.notes = data.get("notes", None)
    except KeyError:
        return "Missing field in request."
    db.session.commit()
    out = {
        "instrumentId": instrument.instrumentId,
        "createdAt": format_datetime(instrument.createdAt),
        "modifiedAt": format_datetime(instrument.modifiedAt)
    }
    db.session.remove()
    db.session.close()
    return out


def delete_an_instrument(instrumentId):
    InstrumentData.query.filter_by(instrumentId=instrumentId).delete()
    db.session.commit()
    db.session.remove()
    db.session.close()
    return "Deleted"
