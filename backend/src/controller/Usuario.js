import modelUsuario from "../model/Usuario.js"

async function criar(req, res) {
  const usuario = req.body;

  if (!usuario.registro_academico || usuario.registro_academico.trim() === '' ) {
    res.status(400).json({ error: 'Obrigatório: Registro acadêmico' });
    return;
  }
  if (!usuario.nome || usuario.nome.trim() === '' ) {
    res.status(400).json({ error: 'Obrigatório: Nome do usuário' });
    return;
  }
  if (!usuario.data_nascimento || usuario.data_nascimento.trim() === '' ) {
    res.status(400).json({ error: 'Obrigatório: Data de nascimento' });
    return;
  }
  if (!usuario.email || usuario.email.trim() === '' ) {
    res.status(400).json({ error: 'Obrigatório: Email do usuário' });
    return;
  }
  if (!usuario.telefone || usuario.telefone.trim() === '' ) {
    res.status(400).json({ error: 'Obrigatório: Telefone do usuário' });
    return;
  }
  if (!usuario.tipo || usuario.tipo.trim() === '' ) {
    res.status(400).json({ error: 'Obrigatório: Tipo do usuário' });
    return;
  }

  try {
    await modelUsuario.criar(usuario);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function mostrar(req, res) {
  try {
    const usuarios = await modelUsuario.mostrar();
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

export default { criar, mostrar };
